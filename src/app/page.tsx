"use client";
import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import WordSearch from "@/components/WordSearch/WordSearch";
import Loader from "@/components/Loader/Loader";
import client from '@/lib/apolloClient';
import SettingsModal from "@/components/SettingsModal";
import NotFound from "@/components/NotFound/NotFound";
import WordSearchFreeSelect from '@/components/WordSearchFreeSelect/WordSearchFreeSelect';

const DEFAULT_VALUE = 15;

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gridSize, setGridSize] = useState<number>(DEFAULT_VALUE);

  useEffect(() => {
    const uri = new URL(document.location.href);
    const params = new URLSearchParams(uri.search);
    const postName = params.get('post_name');
    // Check if environment is "Development" or "Production"
    const environment = process.env.NODE_ENV;

    if (environment === 'development') {
      setCategoryName(postName || 'insects');
    } else {
      setCategoryName(postName || null);
    }
  }, []);

  const { data, loading, error } = useQuery(WORDSEARCH_QUERY, {
    variables: { categoryNames: categoryName ? [categoryName] : [] },
    client: client, // Explicitly passing the client
    skip: !categoryName
  });

  useEffect(() => {
    const dimensions = data?.wordsearchGames?.nodes[0]?.dimensions;
    if (dimensions) {
      const size = parseInt(dimensions.split('x')[0], 10);
      setGridSize(size);
      document.documentElement.style.setProperty('--grid-blocks', size.toString());
    }
  }, [data]);

  const wordList = data?.wordsearchGames.nodes.flatMap((node: any) => node.words.map((word: string) => word.toUpperCase()));

  if (!wordList || loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (wordList?.length === 0) return <NotFound />

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const type = localStorage.getItem("type")

  return (
    <>
      <div className="relative flex justify-center items-center h-screen">
        <SettingsModal isOpen={isModalOpen} onClose={handleToggleModal} />
        {type === "cell-select" ?
          <WordSearch words={wordList} gridSize={gridSize} /> :
          <WordSearchFreeSelect words={wordList} gridSize={gridSize} />
        }
      </div>
    </>
  );
}
