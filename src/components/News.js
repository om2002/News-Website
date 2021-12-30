import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    //  console.log('I am constructor')
    this.state = {
      articles : [],
      loading: true,
      page: 1,
      totalResults: 0
    };

    document.title = `${this.capitalizeFirstLetter(this.props.category)} - OPNews`;
  }

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=08ccd01bcc1c40af937cb4a6b2e135fe&page=${this.state.page}&pageSize=12`;
    let data = await fetch(url);
    this.props.setProgress(30);
    this.setState({ loading: true });
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
    // console.log(" i am in update ", this.state.page);
  }
  async componentDidMount() {
    this.updateNews();
    //    console.log(" i am in componentDidMount ", this.state.page);
  }

  handlePrevClick = async () => {
    await this.setState({
      page: this.state.page - 1,
    });
    this.updateNews();
    // console.log(" i am in handlePrevClick ", this.state.page);
  };

  handleNextClick = async () => {
    await this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
    // console.log(" i am in handleNextClick ", this.state.page);
  };

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=08ccd01bcc1c40af937cb4a6b2e135fe&page=${this.state.page + 1}&pageSize=12`;
    this.setState({page : this.state.page + 1})
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h2 className="text-center " style={{ marginBottom: "30px" , marginTop : '90px'}}>
          OP NEWS - TOP {this.capitalizeFirstLetter(this.props.category)}{" "}
          HEADLINES
        </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {!this.state.loading &&
                this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4  my-2" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 45) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 88)
                            : ""
                        }
                        imageUrl={
                          !element.urlToImage
                            ? "https://images.livemint.com/img/2021/12/26/600x338/5d85a40e-e2f5-11ea-8bff-6706f195ca7a_1597971134731_1597971288940_1640515137659.jpg"
                            : element.urlToImage
                        }
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page === 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 15)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                 </div> */}
      </>
    );
  }
}

export default News;
