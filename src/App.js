import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ALL_FRIENDS = gql`
  query Friends {
    somethingLocal @client {
      bestFriend
    }
    friends {
      contacts {
        id
        name
      }
    }
  }
`;

const ADDRESS_BOOK = gql`
  query AddressBook {
    somethingLocal @client {
      bestFriend
    }
    addressBook {
      contacts {
        id
        name
      }
    }
  }
`;

function FriendList() {
  const { loading, data } = useQuery(ALL_FRIENDS);

  if (loading) {
    return (<p>Loading...</p>);
  }

  return (
    <ul>
      {data.friends.contacts.map(person => {
        if (data.somethingLocal.bestFriend === person.id) {
          return (<li style={{color: "green"}} key={person.id}>{person.name}</li>);
        } else {
          return (<li key={person.id}>{person.name}</li>);
        }
      })}
    </ul>
  )
}

function AddressBook() {
  const { loading, data } = useQuery(ADDRESS_BOOK);

  if (loading) {
    return (<p>Loading...</p>);
  }


  return (
    <ul>
      {data.addressBook.contacts.map(person => {
        if (data.somethingLocal.bestFriend === person.id) {
          return (<li style={{color: "red"}} key={person.id}>{person.name}</li>);
        } else {
          return (<li key={person.id}>{person.name}</li>);
        }
      })}
    </ul>
  )
}

export default function App() {
  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <div style={{display: "flex"}}>
        <FriendList />
        <AddressBook />
      </div>
    </main>
  );
}
