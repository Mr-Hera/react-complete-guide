import {MongoClient} from 'mongodb'

const handler = async (req, res) => {
  if(req.method === 'POST') {
    const data = req.body;
    const { title, image, address, description } = data;
    
    // store attributes in a db
    const client = await MongoClient.connect('mongodb+srv://randellhera:pa55w0rd@cluster0.j3doruu.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);

    console.log(result)
    client.close();

    res.status(201).json({message: 'Meetup added successfully.'});
  }
}

export default handler;