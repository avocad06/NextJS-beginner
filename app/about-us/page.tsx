import styles from './styles.module.css';

export default function AboutUs() {

    const addTodoList = [
        {
            content: "영화 정보 추가(제작사, 제작 국가 등)",
            complete: false,
        },
        {
            content: "영화 영상 정보 추가(게시일, 조회수 등)",
            complete: false,
        },
        {
            content: "로딩 중 상태 UI 개선",
            complete: false,
        },
        {
            content: "영화 상세 페이지 진입 시 브라우저 탭에 영화별 제목 출력 UI 개선",
            complete: false,
        },
        {
            content: "영화 검색 기능 추가",
            complete: false,
        },
    ];

    return (
        <div className={styles.wrapper}>
            <h1>About Project</h1>
            <p className={styles.description}>
                Next.js 프레임워크를 처음 활용하여 만든 영화 정보 페이지입니다.<br/>
                <span className={styles.highlight}>페이지별 라우팅</span>, <span className={styles.highlight}>NextJS가 서버 렌더링을 하는 방식</span>, <span className={styles.highlight}>hydration의 개념</span>, <span className={styles.highlight}>css module의 개념</span>, <span className={styles.highlight}>로딩 컴포넌트 활용</span> 등을 학습하여 구현하였습니다.
            </p>

            <div className={styles.tab}>추가 예정 기능</div>
            <ul className={styles.list}>
                {addTodoList?.map((item) => <li className={styles.todo_item}>{item.content}</li>)}
            </ul>

            <a className={styles.link} href={'https://github.com/avocad06/NextJS-beginner'} target={"_blank"}>Source Code &rarr;</a>
        </div>
    )
}