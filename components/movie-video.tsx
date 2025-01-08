import { BASE_API_URL } from "../app/constatns";
import { IMovieDetailVideo } from "../app/type";
import { validateId } from "../app/utils";
import styles from '../styles/(movie)/videos.module.css';


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


// 이 id 는 prop에서 받아오는 id(not params이므로 비동기 x)
export default async function MovieVideo({id} : {id: string}) {

    // id의 유효성 검사(없는 경우)
    if (!id) {
        throw new Error('id required');
    }


    // id의 유효성 검사(타입이 적합하지 않은 경우)
    validateId(id);


    const videoData = await getMovieVideos(id);
    return (
        <div className={styles.container}>
            {videoData?.map((video) => <iframe 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                key={video.id} 
                title={video.name}
                src={`https://youtube.com/embed/${video.key}`}
             />)}
        </div>
    );
}