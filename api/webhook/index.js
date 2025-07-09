export default function handler(req, res) {
  const VERIFY_TOKEN = "mathbot_token";

  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.status(403).send('Forbidden');
    }
  } else if (req.method === 'POST') {
    const body = req.body;

    // დაამატე ეს ლოგიკა:
    if (body.object === 'whatsapp_business_account') {
      console.log('📩 WhatsApp Message Received:', JSON.stringify(body, null, 2));
    }

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
