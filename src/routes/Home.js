import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component {

    state = {
        isLoading: true,
        movies: []
    };

    //async : 비동기라고 알려주는 것, await : 실행이 완료되면 진행
    getMovies = async () => {
        const {
            data: { //data
                data: { movies }    //data.movies
            }
        } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
        
        this.setState({ movies, isLoading: false });    //이름이 같으면 하나만 쓰면 됨(movies: movies --> movies)
    };

    //render()가 실행 후 호출되는 함수(데이터 로딩할때 사용함수)
    componentDidMount() {
        this.getMovies();        
    }

    render() {

        const { isLoading, movies } = this.state;

        return (
            <section className="container">
                {
                    isLoading ? (
                        <div className="loader">
                            <span className="loader__text">Loading...</span>
                        </div>
                    )
                    :
                    (
                        <div className="movies">
                            {
                                movies.map((movie) => {
                                    return (
                                        <Movie 
                                            key={movie.id}
                                            id={movie.id}
                                            year={movie.year}
                                            title={movie.title}
                                            summary={movie.summary}
                                            poster={movie.medium_cover_image}
                                            genres={movie.genres}
                                        />
                                    );
                                })
                            }
                        </div>
                    )
                }
            </section>
        );
    }
}

export default Home;
