const MAX_FIELD_LENGTH = 4000;

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const body = typeof request.body === "string" ? JSON.parse(request.body) : request.body;
    const message = normalizeMessage(body);

    if (!isValidMessage(message)) {
      return response.status(400).json({ ok: false, error: "Invalid message" });
    }

    if (message.website) {
      return response.status(200).json({ ok: true, delivered: false });
    }

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

    if (!webhookUrl) {
      return response.status(503).json({
        ok: false,
        error: "CONTACT_WEBHOOK_URL is not configured"
      });
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "portfolio-contact-form",
        submittedAt: new Date().toISOString(),
        name: message.name,
        email: message.email,
        subject: message.subject,
        message: message.message
      })
    });

    if (!webhookResponse.ok) {
      throw new Error(`Webhook failed with status ${webhookResponse.status}`);
    }

    return response.status(200).json({ ok: true, delivered: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return response.status(500).json({ ok: false, error: "Unable to send message" });
  }
};

function normalizeMessage(body = {}) {
  return {
    name: clean(body.name),
    email: clean(body.email),
    subject: clean(body.subject),
    message: clean(body.message),
    website: clean(body.website)
  };
}

function clean(value = "") {
  return String(value).trim().slice(0, MAX_FIELD_LENGTH);
}

function isValidMessage(data) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    data.name.length >= 2 &&
    emailPattern.test(data.email) &&
    data.subject.length >= 3 &&
    data.message.length >= 10
  );
}
