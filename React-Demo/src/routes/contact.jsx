import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";;

export async function loader({params}) {
    const contact = await getContact(params.contactId);
    return { contact };
}

export default function Contact() {
    const { contact } = useLoaderData();
    return (
        <div id="contact">
            <div>
                <img
                    key={contact.avatar}
                    src={
                        contact.avatar ||
                        'https://robohash.org/${contact.id}.png?size=200x200'
                    }
                />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{""}
                    <Favourite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p>
                        <a
                            target="_blank"
                            href={'https://twitter.com/${contact.twitter}'}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (
                                !confirm(
                                    "Please confirm you want to delete this record."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

function Favourite({ contact }) {
    const favourite = contact.favourite;
    return (
        <Form method="post">
            <button
                name="favourite"
                value={favourite ? "false" : "true"}
                aria-label={
                    favourite
                        ? "Remove from favourites"
                        : "Add to favourites"
                }
            >
                {favourite ? "★" : "☆"}
            </button>
        </Form>
    );
}