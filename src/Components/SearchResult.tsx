import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';
import moment from 'moment';

import { withSearch } from '../HOC/withSearch';

import { reducer } from "../Reducer/ResultReducer";
import { SEARCH_INPROGRESS, SEARCH_FINISHED } from "../Reducer/constant";
import { articles, newYorkTimes, theguardian, NewYorkTimesAPIColumn, TheGuardianColumn, NewsAPIColumn, SearchResultProps } from '../Interface/type'
import { NewsAPI_Service, TheGuardian_Service, NewYorkTimes_Service } from '../Services/APIServices';
import { SERVICES_LIST, NewsAPICreateData, theguardianAPICreateData, NewYorkTimesAPICreateData, newsAPIColumns, theguardianAPIColumns, newYorkTimesAPIColumns } from '../Interface/constant';

function SearchResult(props: SearchResultProps) {
  const { initState } = props;
  const source: string = localStorage?.getItem('source') || '';
  const categories: string = localStorage?.getItem('categories') || '';
  const authors: string = localStorage?.getItem('authors') || '';
  const dataSources: string = localStorage?.getItem('dataSource') || '';
  const init = { ...initState, source, categories, authors, dataSources };
  const [state, dispatch] = React.useReducer(reducer, init);
  const [page, setPage] = React.useState<number>(state.page || 0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(state.rowsPerPage || 10);
  const [rows, setRows] = React.useState<any[]>([]);
  const [totalResults, setTotalResults] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<any>({ message: '', status: false });

  const FetchingAPI = React.useCallback((source: string, categories: string, authors: string, page: number = 1, pageSize: number = 10) => {
    setIsLoading(true);
    const serviceList: any = {};
    serviceList[SERVICES_LIST.NewsAPI] = () => {
      NewsAPI_Service(source, categories, authors, page, pageSize)
        .then(res => {
          if (res?.status === 'ok') {
            const array: articles[] = [];
            if (authors !== '') res?.articles?.filter((item: articles) => item?.author?.includes(authors)).map((item: articles) => array.push(NewsAPICreateData(item?.author, item?.title, item?.description, item?.publishedAt)));
            else res?.articles?.map((item: articles) => array.push(NewsAPICreateData(item?.author, item?.title, item?.description, item?.publishedAt)));
            if (array.length) {
              setRows(array);
              setTotalResults(res?.totalResults);
            } else {
              setIsError({ message: 'No matching records found for selected author', status: true });
              setTimeout(() => setIsError({ message: '', status: false }), 2000);
            }
          } else {
            setIsError({ message: res?.message, status: true });
            setTimeout(() => setIsError({ message: '', status: false }), 2000);
          }
          setIsLoading(false);
        })
        .catch();
    };
    serviceList[SERVICES_LIST.TheGuardian] = () => {
      TheGuardian_Service(source, categories, authors, page, pageSize)
        .then(res => {
          const response = res?.response;
          if (response?.status === 'ok') {
            const array: theguardian[] = [];
            response?.results?.map((item: any) => array.push(theguardianAPICreateData(item?.type, item?.sectionName, item?.webTitle, item?.webPublicationDate)));
            setRows(array);
            setTotalResults(response?.total);
          } else {
            setIsError({ message: 'No matching records found', status: true });
            setTimeout(() => setIsError({ message: '', status: false }), 2000);
          }
          setIsLoading(false);
        })
        .catch();
    };
    serviceList[SERVICES_LIST.NewYorkTimes] = () => {
      NewYorkTimes_Service(categories, page)
        .then(res => {
          const response = res?.response;
          if (res?.status === 'OK') {
            const array: newYorkTimes[] = [];
            response?.docs?.map((item: any) => array.push(NewYorkTimesAPICreateData(item?.source, item?.section_name, item?.lead_paragraph, item?.pub_date)));
            setRows(array);
            setTotalResults(response?.meta?.hits);
          } else {
            setIsError({ message: res?.fault?.faultstring, status: true });
            setTimeout(() => setIsError({ message: '', status: false }), 2000);
          }
          setIsLoading(false);
        })
        .catch();
    };
    serviceList[dataSources]();
  }, [dataSources]);

  React.useEffect(() => {
    if(dataSources !== '') FetchingAPI(source, categories, authors);
  }, [dataSources, source, categories, authors, FetchingAPI]);



  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch({ type: SEARCH_INPROGRESS, payload: { page: newPage, rowsPerPage: state.rowsPerPage } });
    setPage(newPage);
    FetchingAPI(source, categories, authors, newPage);
    dispatch({ type: SEARCH_FINISHED });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: SEARCH_INPROGRESS, payload: { page: 1, rowsPerPage: +event.target.value } });
    setRowsPerPage(+event.target.value);
    setPage(1);
    FetchingAPI(source, categories, authors, 1, +event.target.value);
    dispatch({ type: SEARCH_FINISHED });
  };

  const NewsAPIValues = (props: any) => {
    const { dataList } = props;
    return (<TableBody>
      {dataList?.map((row: any, index: number) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
              {newsAPIColumns?.map((column) => {
                const value = row[column?.id];
                return (
                  <TableCell key={column.id} align={column.align}>{value}</TableCell>
                );
              })}
            </TableRow>
          );
        })}
    </TableBody>)
  };

  const TheGuardianAPIValues = (props: any) => {
    const { dataList } = props;
    return (<TableBody>
      {dataList?.map((row: any, index: number) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
              {theguardianAPIColumns?.map((column) => {
                const value = row[column?.id];
                return (
                  <TableCell key={column.id} align={column.align}>{value}</TableCell>
                );
              })}
            </TableRow>
          );
        })}
    </TableBody>)
  }

  const NewYorkTimesAPIValues = (props: any) => {
    const { dataList } = props;
    return (<TableBody>
      {dataList?.map((row: any, index: number) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
              {newYorkTimesAPIColumns?.map((column) => {
                const value = row[column?.id];
                return (
                  <TableCell key={column.id} align={column.align}>{value}</TableCell>
                );
              })}
            </TableRow>
          );
        })}
    </TableBody>)
  }

  const NewsAPIHeaders = () => {
    return (<TableRow>
      {newsAPIColumns?.map((column: NewsAPIColumn) => (
        <TableCell
          key={column.id}
          align={column.align}
          style={{ minWidth: column.minWidth }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>)
  }

  const TheGuardianAPIHeaders = () => {
    return (<TableRow>
      {theguardianAPIColumns?.map((column: TheGuardianColumn) => (
        <TableCell
          key={column.id}
          align={column.align}
          style={{ minWidth: column.minWidth }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>)
  }

  const NewYorkTimesAPIHeaders = () => {
    return (<TableRow>
      {newYorkTimesAPIColumns?.map((column: NewYorkTimesAPIColumn) => (
        <TableCell
          key={column.id}
          align={column.align}
          style={{ minWidth: column.minWidth }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>)
  }

  const TableStructure = (props: any) => {
    const { result } = props;
    return (<>
      <TableContainer sx={{ maxHeight: 550 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            {dataSources === SERVICES_LIST.NewsAPI && <NewsAPIHeaders />}
            {dataSources === SERVICES_LIST.TheGuardian && <TheGuardianAPIHeaders />}
            {dataSources === SERVICES_LIST.NewYorkTimes && <NewYorkTimesAPIHeaders />}
          </TableHead>
          {dataSources === SERVICES_LIST.NewsAPI && <NewsAPIValues dataList={result} />}
          {dataSources === SERVICES_LIST.TheGuardian && <TheGuardianAPIValues dataList={result} />}
          {dataSources === SERVICES_LIST.NewYorkTimes && <NewYorkTimesAPIValues dataList={result} />}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={dataSources === SERVICES_LIST.NewYorkTimes ? [] : [10, 25, 100]}
        component="div"
        count={totalResults}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /></>)
  };

  const FilterizeTable = withSearch(TableStructure, rows, dataSources);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {isError?.status && <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">{isError?.message}</Alert>
      </Stack>}
      {isLoading ?
        <Box sx={{ width: 300 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box> : totalResults > 0 ? <FilterizeTable /> : <Alert icon={<CheckIcon fontSize="inherit" />} severity="success"> No data found. </Alert>}
    </Paper>
  );
}

export default SearchResult;