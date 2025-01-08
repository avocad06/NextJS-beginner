import { BASE_API_URL } from "../constatns";
import Movie from "../../components/movie_item";
import styles from "../../styles/(home)/homepage.module.css";



export const metadata = {
    title : 'Home',
}

/**
 * data를 fecthing 하는 함수
 * @description 이 함수는 컴포넌트 안에 있을 필요 없습니다
 */

async function getPopularMovies() {

    // (dev)Loading 상태를 확인하기 위한 쓰로틀링
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 1000);   
    });
    
    let resultData = []; // 반환 값 초기화

    const response = await fetch(BASE_API_URL, {
        method: 'GET',
    });



    // response가 ok인 경우 반환 값 데이터 설정
    if (!response?.ok) {
        throw new Error('fetching error');
    } else {
        const resJson = await response.json();
        resultData  = resJson ? resJson : [];
    }

    // 결과를 return 한다
    return resultData;
}



// [serverside fetch] await 을 사용하기 위해 부모 함수에 async를 추가한다
export default async function HomePage() {
    const movieData = await getPopularMovies();
    return (
        <div className="homepage">
            <div className={styles.container}>
                {movieData?.map((movie) => 
                    <Movie 
                    key={movie.id} 
                    id={movie.id} 
                    title={movie.title} 
                    poster_path={movie.poster_path} 
                    />
                )}
            </div>
        </div>
    )
}