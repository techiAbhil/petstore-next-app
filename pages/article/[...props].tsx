import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Card } from 'react-bootstrap';
import DefaultArticleImage from '../../assets/default-article.png';
import CustomLoader from '../../components/common/CustomLoader';
import MyImage from '../../components/common/MyImage';
import Layout from '../../components/layout/layout';

const Article = () => {
    const router = useRouter();
    const routePorps = router.query.props;
    const [articleID]: any = routePorps ?? [''];

    const [articleDetails, setArticleDetails] = useState<any>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            if (articleID === '') return;
            try {
                setIsLoading(true);
                const data: any = await axios.get(
                    `petfamily/article/${articleID}`
                );
                if (data?.status === true && data?.article) {
                    setArticleDetails(data?.article);
                } else {
                    setArticleDetails(undefined);
                }
                setIsLoading(false);
            } catch (e) {
                alert('Something went wrong! please try again!');
                setIsLoading(false);
                console.log('could not fetch the data');
            }
        })();
    }, [articleID]);

    const articleParasList = useMemo(() => {
        if (articleDetails?.ar_contents) {
            return articleDetails.ar_contents.split('\r\n\r\n');
        }
        return '';
    }, [articleDetails?.ar_contents]);

    return (
        <Layout>
            <Head>
                <title>{articleDetails?.ac_title ?? 'Article'}</title>
            </Head>
            <section className="mt-3 mb-5 container">
                <CustomLoader show={isLoading} />
                {!isLoading && articleDetails === undefined && (
                    <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                        <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                            Article details not found!!!
                        </h2>
                    </div>
                )}
                {isLoading && (
                    <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                        <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                            Loading Please wait!!!
                        </h2>
                    </div>
                )}
                {!isLoading && articleDetails?.ar_title && (
                    <section className="row">
                        <div className=" col-12 p-5 d-flex justify-content-center">
                            <Card className="mb-1 home-list-items">
                                <Card.Title>
                                    <div className="center">
                                        <MyImage
                                            height={350}
                                            width={350}
                                            defaultImage={DefaultArticleImage}
                                            src={`${process.env.NEXT_PUBLIC_ARTICLE_PIC}/${articleDetails?.ar_banner_path}`}
                                            alt="Banner Image"
                                        />
                                    </div>
                                    <h2 className="fw-bolder text-center my-2">
                                        {articleDetails?.asc_title}
                                    </h2>
                                </Card.Title>
                                <Card.Body>
                                    <Card.Text>
                                        {articleParasList?.map(
                                            (para: any, index: number) => (
                                                <p key={index}>{para}</p>
                                            )
                                        )}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </section>
                )}
            </section>
        </Layout>
    );
};

export default Article;
