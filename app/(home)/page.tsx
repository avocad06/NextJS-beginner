import Link from "next/link";

export const metadata = {
    title : 'Home',
}

// url을 확인한다
export const BASE_API_URL = 'https://nomad-movies.nomadcoders.workers.dev/movies';

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
        <div>
            {movieData?.map((movie) => 
            <li key={movie.id}>
                <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
        )}
        </div>
    )
}