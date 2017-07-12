import { List, Map } from 'immutable';


export const DEFAULT_REQUEST = new Map({
  inProgress: false,
  error: null,
});

export const RECIPE_LISTING_COLUMNS = new List([
  'name',
  'action',
  'enabled',
  'lastUpdated',
]);

export const DEFAULT_RECIPE_LISTING_COLUMNS = new List([
  'name',
  'action',
  'enabled',
  'lastUpdated',
]);

export const EXTENSION_LISTING_COLUMNS = new List([
  'name',
  'xpi',
]);

export const DEFAULT_EXTENSION_LISTING_COLUMNS = new List([
  'name',
]);