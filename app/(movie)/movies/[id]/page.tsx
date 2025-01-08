import { Suspense } from "react";
import MovieDetail from "../../../../components/movie-detail";
import MovieVideo from "../../../../components/movie-video";
import MovieLoading from "../../../../components/movie-fallback";
import { BASE_API_URL } from "../../../constatns";
import { validateId } from "../../../utils";
import { IMovieDetail, IMovieDetailVideo } from "../../../type";

/**
 * moves/id
 * 영화 상세 페이지
 * data를 fetch 한 다음 영화 정보를 보여주는 페이지
 */


/**
 * 특정 영화 정보 data를 fetching 하는 함수
 * @param id
 * @returns 
 */
async function getMovieDetail(id: string): Promise<IMovieDetail> {
    
    let resultData = {}; // 반환 값 초기화

    const requestURL = `${BASE_API_URL}/${id}`

    const response = await fetch(requestURL, {
        method: 'GET',
    });


    // response가 ok인 경우 반환 값 데이터 설정
    if (!response?.ok) {
        throw new Error('fetching error');
    } else {
        const resJson = await response.json();
        resultData  = resJson ? resJson : {};
    }

    // 결과를 return 한다
    return resultData;   
}


/**
 * 특정 영화 video data를 fetching 하는 함수
 * @param id
 * @returns 
 */
async function getMovieVideos(id: string): Promise<IMovieDetailVideo[]> {
    
    let resultData = []; // 반환 값 초기화

    const requestURL = `${BASE_API_URL}/${id}/videos`

    const response = await fetch(requestURL, {
        method: 'GET',
    });


    // response가 ok인 경우 반환 값 데이터 설정
    if (!response?.ok) {
        throw new Error('fetching error');
    } else {
        const resJson = await response.json();
        resultData  = resJson ? resJson : {};
    }

    // 결과를 return 한다
    return resultData;   
}


// data fetching 이 완료되기 전까지 HTML을 await 한다
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // id의 유효성 검사(없는 경우)
    if (!id) {
        throw new Error('id required');
    }


    // id의 유효성 검사(타입이 적합하지 않은 경우)
    validateId(id);


    /**
     * // data fetching 3단계
     */
    
    // 1) 순차적으로 fetch 한다
    // const movieDetailData = await getMovieDetail(id);
    // const videoData = await getMovieVideos(id);
    

    // 2) Promise.all() 을 사용하여 병렬로 요청한다
    // 순차적으로 처리하게 되면 응답 시간이 긴 데이터 요청이 완료될 때까지 기다려야하기 때문
    // const [ movieData, videoData ] = await Promise.all([ getMovieDetail(id), getMovieVideos(id) ]);


    // 3) suspense로 컴포넌트 별로 fetching을 할 수 있도록 한다
    

    return (
        <div className="movie_detail_page">
            <Suspense fallback={<MovieLoading name="Detail"/>}>
                <MovieDetail id={id} />
            </Suspense>
            <Suspense fallback={<MovieLoading name="Videos"/>}>
                <MovieVideo id={id} />
            </Suspense>
        </div>
    )
}