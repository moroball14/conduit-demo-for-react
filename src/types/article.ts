import { Decoder, object, string, array, iso8601, boolean, number, nullable } from 'decoders';
import { Profile } from './profile';

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

export const articleDecoder: Decoder<Article> = object({
  slug: string,
  title: string,
  description: string,
  body: string,
  tagList: array(string),
  createdAt: iso8601,
  updatedAt: iso8601,
  favorited: boolean,
  favoritesCount: number,
  author: object({
    username: string,
    bio: nullable(string),
    image: nullable(string),
    following: boolean,
  }),
});

export interface MultipleArticles {
  articles: Article[];
  articlesCount: number;
}

export const multipleArticles: Decoder<MultipleArticles> = object({
  articles: array(articleDecoder),
  articlesCount: number,
});
