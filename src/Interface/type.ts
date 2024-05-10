
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

  export const newsAPIColumns: readonly NewsAPIColumn[] = [
    { id: 'author', label: 'Author', minWidth: 170 },
    { id: 'title', label: 'Title', minWidth: 100 },
    {
      id: 'description',
      label: 'Description',
      minWidth: 170,
    },
    {
      id: 'publishedAt',
      label: 'Published At',
      minWidth: 170,
      align: 'right'
    },
  ];
  
  export const NewsAPICreateData = (
      author: string,
      title: string,
      description: string,
      publishedAt: string,
  ): articles => {
    return { author, title, description, publishedAt };
  }

  export interface NewYorkTimesAPIColumn {
    id: 'source' | 'section_name' | 'lead_paragraph' | 'pub_date';
    label: string;
    minWidth?: number;
    align?: 'right';
  }

  export const newYorkTimesAPIColumns: readonly NewYorkTimesAPIColumn[] = [
    { id: 'source', label: 'Source', minWidth: 170 },
    { id: 'section_name', label: 'Section Name', minWidth: 100 },
    {
      id: 'lead_paragraph',
      label: 'Lead Paragraph',
      minWidth: 170,
    },
    {
      id: 'pub_date',
      label: 'Published Date',
      minWidth: 170,
      align: 'right'
    },
  ];
  
  export const NewYorkTimesAPICreateData = (
    source: string,
      section_name: string,
      lead_paragraph: string,
      pub_date: string,
  ): newYorkTimes => {
    return { source, section_name, lead_paragraph, pub_date };
  }

  export interface TheGuardianColumn {
    id: 'type' | 'sectionName' | 'webTitle' | 'webPublicationDate';
    label: string;
    minWidth?: number;
    align?: 'right';
  }

  export const theguardianAPIColumns: readonly TheGuardianColumn[] = [
    { id: 'type', label: 'Source', minWidth: 170 },
    { id: 'sectionName', label: 'Section Name', minWidth: 100 },
    {
      id: 'webTitle',
      label: 'Web Title',
      minWidth: 170,
    },
    {
      id: 'webPublicationDate',
      label: 'WebPublication Date',
      minWidth: 170,
      align: 'right'
    },
  ];
  
  export const theguardianAPICreateData = (
    type: string,
      sectionName: string,
      webTitle: string,
      webPublicationDate: string,
  ): theguardian => {
    return { type, sectionName, webTitle, webPublicationDate };
  }