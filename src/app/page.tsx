"use client";
import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import WordSearch from "@/components/WordSearch/WordSearch";
import Loader from "@/components/Loader/Loader";
import client from '@/lib/apolloClient';

const WORDSEARCH_QUERY = gql`
  query GetWordsearchGames($categoryNames: [String]!) {
    wordsearchGames(where: {nameIn: $categoryNames}) {
      nodes {
        id
        title
        slug
        dimensions
        words
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export default function Home() {
  const [categoryName, setCategoryName] = useState<string | null>(null);

  useEffect(() => {
    const uri = new URL(document.location.href);
    const params = new URLSearchParams(uri.search);
    const postName = params.get('post_name');
    setCategoryName(postName || 'programming-languages');
  }, []);

  const { data, loading, error } = useQuery(WORDSEARCH_QUERY, {
    variables: { categoryNames: categoryName ? [categoryName] : [] },
    client: client, // Explicitly passing the client
    skip: !categoryName
  });

  console.log(data, loading, error);

  const wordList = data?.wordsearchGames.nodes.flatMap((node: any) => node.words.map((word: string) => word.toUpperCase()));

  if (loading || !wordList || wordList.length === 0) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  // if (!wordList || wordList.length === 0) return <div>No games found.</div>;

  return (
    <div className="flex justify-center items-center h-screen">
      <WordSearch words={wordList} />
    </div>
  );
}
