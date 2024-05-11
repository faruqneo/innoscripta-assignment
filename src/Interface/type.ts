import { ReducerState } from "../Reducer/ResultReducer";

export interface articles {
  author: string;
  title: string;
  description: string;
  publishedAt: string;
};

export interface newYorkTimes {
  source: string;
  section_name: string;
  lead_paragraph: string;
  pub_date: string;
};

export interface theguardian {
  type: string;
  sectionName: string;
  webTitle: string;
  webPublicationDate: string;
};

export interface newsResponse {
  status: string;
  totalResults: number;
  articles: [articles];
};

export interface NewsAPIColumn {
  id: 'author' | 'title' | 'description' | 'publishedAt';
  label: string;
  minWidth?: number;
  align?: 'right';
}

export interface NewYorkTimesAPIColumn {
  id: 'source' | 'section_name' | 'lead_paragraph' | 'pub_date';
  label: string;
  minWidth?: number;
  align?: 'right';
}

export interface TheGuardianColumn {
  id: 'type' | 'sectionName' | 'webTitle' | 'webPublicationDate';
  label: string;
  minWidth?: number;
  align?: 'right';
}

export interface Services_List {
  NewsAPI: string;
  TheGuardian: string;
  NewYorkTimes: string;
}

export interface DrawerProps {
  window?: () => Window;
}

export interface PersonalizedNewFeedProps {
  search: (data: ReducerState) => void;
}

export interface SearchResultProps {
  initState: any;
}

export interface withSearchProps {
  result: any[]
}