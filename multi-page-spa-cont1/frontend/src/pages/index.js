import EditEventPage from './EditEvent'
import EventDetailPage from './EventDetail'
import EventsPage from './Events'
import HomePage from './Home'
import NewEventPage from './NewEvent'
import ErrorPage from './Error'
import RootLayout from './Root'
import EventsRootLayout from './EventsRoot'
import NewsletterPage from './Newsletter'
import { loader as eventsLoader } from './Events'
import { loader as eventDetailLoader } from './EventDetail'
import { action as deleteEventAction } from './EventDetail'
import { action as newsletterAction } from './Newsletter'

export {
    EditEventPage,
    EventDetailPage,
    EventsPage,
    HomePage,
    NewEventPage,
    ErrorPage,
    RootLayout,
    EventsRootLayout,
    NewsletterPage,
    eventsLoader,
    eventDetailLoader,
    deleteEventAction,
    newsletterAction,
};