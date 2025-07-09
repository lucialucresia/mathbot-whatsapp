export default function handler(req, res) {
  if (req.method === 'GET') {
    const VERIFY_TOKEN = 'mathbot_verify_f798920f';
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else if (req.method === 'POST') {
    console.log('Received webhook:', req.body);
    res.sendStatus(200);
  } else {
    res.sendStatus(405);
  }
}
