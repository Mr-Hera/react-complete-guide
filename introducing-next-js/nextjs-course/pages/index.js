import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://images.pexels.com/photos/3591557/pexels-photo-3591557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        address: 'Some address 5, 12345 Some City',
        description: 'This is a First Meetup.',
    },
    {
        id: 'm2',
        title: 'A Second Meetup',
        image: 'https://images.pexels.com/photos/5711174/pexels-photo-5711174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        address: 'Some address 10, 12345 Some City',
        description: 'This is a Second Meetup.',
    },
];
const HomePage = (props) => {

  return (
    <>
        <Head>
            <title>React Meetups</title>
            <meta name="description" content="Browse a huge list of highly active React meetups!" />
        </Head>
        <MeetupList meetups={props.meetups} />
    </>
  )
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     // fetch data from api
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         },
//     };
// }

export async function getStaticProps() {
    // fetch data from an api
    const client = await MongoClient.connect('mongodb+srv://randellhera:pa55w0rd@cluster0.j3doruu.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                id: meetup._id.toString(),
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
            }))
        },
        revalidate: 1
    };
}

export default HomePage
