/* =========================================================
   Mastercommerce AI proxy  (Cloudflare Worker)

   Why this exists: the browser app must never contain your
   secret API key. The app talks to THIS server, and only this
   server knows the key.

   Deploy (about 10 minutes):
   1. Create a free Cloudflare account, then: npm install -g wrangler
   2. wrangler init mastercommerce-ai   (choose "Hello World" Worker)
   3. Replace the Worker's code with this file.
   4. wrangler secret put ANTHROPIC_API_KEY      (paste your key)
      For Brave search results (optional): wrangler secret put BRAVE_API_KEY
      (Brave's plans change - check api-dashboard.search.brave.com for what a new
       account gets. The key is a secret: it must only ever live here.)
   5. In wrangler.toml add:
        [vars]
        ALLOWED_ORIGIN = "https://your-app-address.com"
        MODEL = "claude-sonnet-5-5"
   6. wrangler deploy  -> copy the URL it prints
   7. In script.js set:  mcAI.endpoint = "that URL"

   Also set a monthly spending limit in your Anthropic console
   and add a rate-limit rule in Cloudflare so nobody can run up
   your bill.
========================================================= */

const SYSTEM_PROMPT = (today) => `You are Mastercommerce, a friendly educational assistant for students (South Africa focus, but answer for any country).
Today's date is ${today}.

Rules:
- For anything that can change (who holds an office, records, prices, news, sports, weather, "latest", "current"), use web search and answer from what you find. Say when something may have changed recently.
- Never invent facts, figures, sources, standards or calculation results. If you are unsure, say so.
- Use the exact figures the student gives. If information is missing, say what is missing instead of guessing.
- For calculations show numbered steps, the formula, the substitution and a final line starting with "∴". Use symbols: × ÷ − ² √ ≈.
- If marks are given, match the depth of the answer to the marks. If "answers only" is requested, give just the final answers.
- Keep answers short and easy to read on a phone. Plain text, no tables, no headings. Use "**bold**" sparingly.
- Answer exactly what was asked, in the language the student used.`;

export default {
  async fetch(request, env) {
    const allowed = env.ALLOWED_ORIGIN || "*";
    const cors = {
      "Access-Control-Allow-Origin": allowed,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };
    const reply = (obj, status = 200) =>
      new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });

    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return reply({ error: "POST only" }, 405);
    if (allowed !== "*" && request.headers.get("Origin") !== allowed) return reply({ error: "Not allowed" }, 403);
    if (!env.ANTHROPIC_API_KEY) return reply({ error: "Server is missing ANTHROPIC_API_KEY" }, 500);

    let body;
    try { body = await request.json(); } catch (e) { return reply({ error: "Bad JSON" }, 400); }

    const question = String(body.question || "").slice(0, 8000).trim();
    if (!question) return reply({ error: "No question" }, 400);

    /* Brave Search mode: returns a plain list of results (no AI) */
    if (body.mode === "brave") {
      if (!env.BRAVE_API_KEY) return reply({ error: "Server is missing BRAVE_API_KEY" }, 500);
      try {
        const res = await fetch(
          "https://api.search.brave.com/res/v1/web/search?count=5&q=" + encodeURIComponent(question.slice(0, 400)),
          { headers: { "Accept": "application/json", "X-Subscription-Token": env.BRAVE_API_KEY } }
        );
        if (!res.ok) return reply({ error: "Brave returned HTTP " + res.status }, 502);
        const data = await res.json();
        const strip = t => String(t || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
        const results = ((data.web && data.web.results) || []).slice(0, 5).map(r => {
          let host = "";
          try { host = new URL(r.url).hostname; } catch (e) { /* ignore */ }
          return { title: strip(r.title), description: strip(r.description), url: r.url, host };
        });
        return reply({ results });
      } catch (e) {
        return reply({ error: "Could not reach Brave Search" }, 502);
      }
    }

    let prompt = question;
    if (body.context) prompt = "Context from the same document:\n" + String(body.context).slice(0, 4000) + "\n\nQuestion:\n" + question;
    if (body.marks) prompt += `\n\n(This question is worth ${Number(body.marks)} marks.)`;
    if (body.answersOnly) prompt += "\n\n(Give only the final answer.)";
    if (body.examFormat) prompt += "\n\n(Answer in examination format.)";

    const today = new Date().toISOString().slice(0, 10);
    const messages = [{ role: "user", content: prompt }];
    let text = "";

    try {
      /* web search can pause long turns; continue up to 3 times */
      for (let turn = 0; turn < 3; turn++) {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": env.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01"
          },
          body: JSON.stringify({
            model: env.MODEL || "claude-sonnet-5-5",
            max_tokens: 1500,
            system: SYSTEM_PROMPT(today),
            tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 3 }],
            messages
          })
        });
        const data = await res.json();
        if (!res.ok) return reply({ error: (data.error && data.error.message) || "Upstream error" }, 502);

        text += (data.content || []).filter(b => b.type === "text").map(b => b.text).join("");

        if (data.stop_reason === "pause_turn") {
          messages.push({ role: "assistant", content: data.content });
          continue;
        }
        break;
      }
    } catch (e) {
      return reply({ error: "Could not reach the AI service" }, 502);
    }

    return reply({ answer: text.trim() });
  }
};
