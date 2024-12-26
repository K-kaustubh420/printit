import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { files, printType, deliveryMethod, additionalComments, deliveryAddress, selectedShop } = req.body;

    // Create a transporter for Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: 'recipient-email@gmail.com',
      subject: 'New Print Order',
      text: `
        Print Order Details:
        Print Type: ${printType}
        Delivery Method: ${deliveryMethod}
        Additional Comments: ${additionalComments}
        Delivery Address: ${deliveryAddress || 'N/A'}
        Selected Shop: ${selectedShop || 'N/A'}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Order placed successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Error sending email.' });
    }
  }
}
