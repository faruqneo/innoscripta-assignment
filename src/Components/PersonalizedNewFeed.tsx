import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { reducer, initialState, ReducerState } from '../Reducer/ResultReducer'
import { SEARCH_INITTATED } from '../Reducer/constant'

interface Props {
    search: (data: any) => void;
  }

export default function SelectSmall(props: Props) {
  const pervDataSources: string = localStorage?.getItem('dataSource') || '';
  const pervSources: string = localStorage?.getItem('source') || '';
  const pervCategories: string = localStorage?.getItem('categories') || '';
  const pervAuthors: string = localStorage?.getItem('authors') || '';
  const init: ReducerState = { ...initialState, dataSources: pervDataSources, source: pervSources, categories: pervCategories, authors: pervAuthors };
  const { search } = props;
  const [_, dispatch] = React.useReducer(reducer, init);
  const [source, setSource] = React.useState(pervSources);
  const [categories, setCategories] = React.useState(pervCategories);
  const [authors, setAuthors] = React.useState(pervAuthors);
  const [dataSources, setDataSources] = React.useState(pervDataSources);

  const handleDataSource = (event: SelectChangeEvent) => {
    localStorage.setItem('dataSource', event.target.value);
    setDataSources(event.target.value)
  }

  const handleSearch = async () => {
    const payload = {source, categories, authors, isLoading: true, rowsPerPage: 10, page: 1, dataSources };
    await dispatch({ type: SEARCH_INITTATED, payload });
    search(payload);
  };

  const handleSource = async (event: SelectChangeEvent) => {
    localStorage.setItem('source', event.target.value);
    setSource(event.target.value)
  };

  const handleCategories = async (event: SelectChangeEvent) => {
    localStorage.setItem('categories', event.target.value);
    setCategories(event.target.value);
    }

  const handleAuthors = async (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('authors', event.target.value);
    setAuthors(event.target.value);
  };

  const handleReset = () => { 
    localStorage.setItem('dataSource', '');
    localStorage.setItem('source', '');
    localStorage.setItem('categories', '');
    localStorage.setItem('authors', '');
    setAuthors('');
    setCategories('');
    setSource('')
    setDataSources('')
  };

  return (<>
  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="apiName">Data Sources</InputLabel>
      <Select
        labelId="apiName"
        id="apiName"
        value={dataSources}
        label="apiName"
        onChange={handleDataSource}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'NewsAPI'}>NewsAPI</MenuItem>
        <MenuItem value={'theguardian'}>The Guardian</MenuItem>
        <MenuItem value={'nytimes'}>New York Times</MenuItem>
      </Select>
    </FormControl>
    {(dataSources !== '' && dataSources !== 'nytimes') && <>
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="sourcesName">Sources</InputLabel>
      <Select
        labelId="sourcesName"
        id="source"
        value={source}
        label="sources"
        onChange={handleSource}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'bbc-news'}>BBC News</MenuItem>
        <MenuItem value={'abc-news'}>ABC News</MenuItem>
        <MenuItem value={'ansa'}>ANSA.it</MenuItem>
        <MenuItem value={'argaam'}>Argaam</MenuItem>
        <MenuItem value={'ars-technica'}>Ars Technica</MenuItem>
        <MenuItem value={'ary-news'}>Ary News</MenuItem>
        <MenuItem value={'associated-press'}>Associated Press</MenuItem>
        <MenuItem value={'bloomberg'}>Bloomberg</MenuItem>
      </Select>
    </FormControl>

    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
    <InputLabel id="categoriesName">categories</InputLabel>
      <Select
        labelId="categoriesName"
        id="categories"
        value={categories}
        label="categories"
        onChange={handleCategories}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'business'}>Business</MenuItem>
        <MenuItem value={'sports'}>Sports</MenuItem>
        <MenuItem value={'entertainment'}>Entertainment</MenuItem>
        <MenuItem value={'health'}>Health</MenuItem>
        <MenuItem value={'science'}>Science</MenuItem>
        <MenuItem value={'technology'}>Technology</MenuItem>
      </Select>
    </FormControl>

    {dataSources === 'NewsAPI' && <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
    <InputLabel id="authorsName">authors</InputLabel>
    <Input 
        id="authors" 
        name='authors' 
        value={authors}
        onChange={handleAuthors}
    />
    </FormControl>}
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
    <Button variant="outlined" disabled={(source === '' && categories === '')} onClick={handleSearch}>Search</Button>
    </FormControl>
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
    <Button variant="outlined" onClick={handleReset}>Reset</Button>
    </FormControl>
    </>}

    {(dataSources === 'nytimes') && <>
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
    <InputLabel id="categoriesName">categories</InputLabel>
      <Select
        labelId="categoriesName"
        id="categories"
        value={categories}
        label="categories"
        onChange={handleCategories}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'business'}>Business</MenuItem>
        <MenuItem value={'sports'}>Sports</MenuItem>
        <MenuItem value={'entertainment'}>Entertainment</MenuItem>
        <MenuItem value={'health'}>Health</MenuItem>
        <MenuItem value={'science'}>Science</MenuItem>
        <MenuItem value={'technology'}>Technology</MenuItem>
      </Select>
    </FormControl>
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Button variant="outlined" disabled={(categories === '')} onClick={handleSearch}>Search</Button>
    </FormControl>
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Button variant="outlined" onClick={handleReset}>Reset</Button>
    </FormControl>
    </> }
  </>);
}