import axios from 'axios';
import { guard, object, array, string } from 'decoders';
import settings from '../config/settings';
import { multipleArticles } from '../types/article';

axios.defaults.baseURL = settings.baseUrl;

export const getArticles = async () => {
  return guard(multipleArticles)((await axios.get('articles')).data);
};

export const getTags = async () => {
  return guard(object({ tags: array(string) }))((await axios.get('tags')).data);
};
