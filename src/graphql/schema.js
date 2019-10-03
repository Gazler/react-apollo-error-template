import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const AddressBookType = new GraphQLObjectType({
  name: 'AddressBook',
  fields: {
    contacts: { type: new GraphQLList(PersonType) }
  },
});

const FriendsType = new GraphQLObjectType({
  name: 'Friends',
  fields: {
    contacts: { type: new GraphQLList(PersonType) }
  },
});

const peopleData = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Sara Smith' },
  { id: 3, name: 'Budd Deey' },
];

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    addressBook: {
      type: AddressBookType,
      resolve: () => ({contacts: peopleData})
    },
    friends: {
      type: FriendsType,
      resolve: () => ({contacts: peopleData})
    }
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
