import React from 'react'
import Head from 'next/head'
import MeetupDetail from '../../components/meetups/MeetupDetail'
import { MongoClient, ObjectId } from 'mongodb'

const index = (props) => {
  return (
    <>
        <Head>
            <title>{ props.meetupData.title }</title>
            <meta name="description" content={props.meetupData.description} />
        </Head>
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    </>
  )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://randellhera:pa55w0rd@cluster0.j3doruu.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.find({}, {_id: 1}).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({
            params: { meetupId: meetup._id.toString() },
        })),
    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    console.log(meetupId);

    // fetch data for single meetup from api
    const client = await MongoClient.connect('mongodb+srv://randellhera:pa55w0rd@cluster0.j3doruu.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollection = db.collection('meetups');
    const selectedMeetup = await meetupCollection.findOne({ _id: new ObjectId(meetupId), });

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            },
        }
    };
}

export default index
