import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export default function QueryComponent() {
    const { loading, error, data } = useQuery(gql`
        {
            hello(name: "bob")
        }
    `);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return <div>{JSON.stringify(data)}</div>;
}
