import mysql from 'mysql2/promise';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  console.log("Handler called with method:", req.method);
  if (req.method === 'POST') {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public', 'schoolImages'),
      keepExtensions: true,
    });

    // Ensure the upload directory exists
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir, { recursive: true });
    }

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error during file parsing:", err);
        res.status(500).json({ error: 'Something went wrong during file parsing' });
        return;
      }

      console.log("Fields received:", fields);
      console.log("Files received:", files);

      const { name, address, city, state, contact, email_id } = fields;
      const imageFile = files.image ? files.image[0] : null;

      // Extracting the actual values from the fields
      const extractedName = name ? name[0] : null;
      const extractedAddress = address ? address[0] : null;
      const extractedCity = city ? city[0] : null;
      const extractedState = state ? state[0] : null;
      const extractedContact = contact ? contact[0] : null;
      const extractedEmail = email_id ? email_id[0] : null;

      if (!extractedName || !extractedAddress || !extractedCity || !extractedState || !extractedContact || !extractedEmail || !imageFile) {
        console.error("Missing required fields");
        res.status(400).json({ error: 'All fields are required' });
        return;
      }

      if (imageFile.size > 2000000) { // 2MB limit
        console.error("File size exceeds limit");
        res.status(400).json({ error: 'File size must be less than 2MB' });
        return;
      }

      const relativeFilePath = path.join('schoolImages', imageFile.newFilename);

      try {
        const connection = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          database: 'new',
          password: 'iamnavyasri',
        });

        try {
          await connection.execute(
            'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [extractedName, extractedAddress, extractedCity, extractedState, extractedContact, extractedEmail, relativeFilePath]
          );
          res.status(200).json({ message: 'School added successfully' });
        } catch (dbError) {
          console.error("Database error:", dbError);
          res.status(500).json({ error: 'Failed to add school to database' });
        } finally {
          await connection.end();
        }
      } catch (connectionError) {
        console.error("Connection error:", connectionError);
        res.status(500).json({ error: 'Failed to connect to the database' });
      }
    });
  } else {
    console.log("Invalid method");
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
