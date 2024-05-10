import React from "react";

interface withSearchProps {
    result: any[]
  }

export const withSearch = (WrappedComponent: React.ComponentType<withSearchProps>, list: any, dataSources: string) => {
    class WithSearch extends React.Component {
      state = {
        searchTerm: ""
      };
      handleSearch = (event: { target: { value: string; }; }) => {
        this.setState({ searchTerm: event.target.value });
      };

      filterPerson = (searchTerm: string) => {
        let result = list;
        if(dataSources === 'NewsAPI') {
            
        } else if(dataSources === 'theguardian') {
            
        } else if(dataSources === 'nytimes') {
            result = list.filter((item: any) => item?.lead_paragraph?.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return result;
      };
  
      render() {
        const { searchTerm } = this.state;
        const filteredProducts: any = this.filterPerson(searchTerm);
        
        return (
          <main className="containter">
            <div className="search__box">
            <input
              onChange={this.handleSearch}
              value={searchTerm}
              type="text"
              placeholder="Search By Keyword"
              data-testid="searchInput"
              aria-label="searchNameInputBox"
              aria-required="true"
              tabIndex={0}
            />
            </div>

            <WrappedComponent result={filteredProducts} />
          </main>
        );
      }
    };
    return WithSearch;
  };