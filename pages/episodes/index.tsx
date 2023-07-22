import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import CustomLoader from '../../components/common/CustomLoader';
import PetSelectDropdown from '../../components/common/PetSelectDropdown';
import Layout from '../../components/layout/layout';
import { useAppSelector } from '../../store/store';

const COLS: string[] = [
    'Episode Description',
    'Date Of Occurence',
    'Vet Visit',
    'Intensity',
    'Vet Prognosis',
    'Action',
    'Remarks',
];

const Episodes = () => {
    const [episodes, setEpisodesList] = useState<any[]>([]);
    const { selectedPetIDForMarketplace } = useAppSelector(
        (state) => state.userSelectedOptions
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const data: any = await axios.get(
                    `pet/${selectedPetIDForMarketplace}/episode`
                );
                if (Array.isArray(data?.episodes)) {
                    setEpisodesList(data.episodes);
                }
                setIsLoading(false);
            } catch (e) {
                alert('Something went wrong! please try again!');
                setIsLoading(false);
                console.log('could not fetch the data');
            }
        })();
    }, [selectedPetIDForMarketplace]);
    return (
        <Layout>
            <section className="mt-1 mb-1 container">
                {/* pet dropdown start */}
                <div className="col-center ">
                    <div className="row d-flex flex-column align-items-center justify-content-center section-text-style">
                        <h4 className="pt-1 col-sm-12 text-center text-uppercase">
                            Episodes & Symptomatic History
                        </h4>
                    </div>
                    <PetSelectDropdown />
                </div>
                <CustomLoader show={isLoading} />
                <div className="center mt-2">
                    {episodes.length > 0 ? (
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    {COLS.map((col) => (
                                        <th key={col}>{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {episodes.map((v: any, i: number) => {
                                    return (
                                        <tr key={i}>
                                            <td className="text-capitalize">
                                                {v?.ep_description}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.ep_date}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.ep_vet_visit}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.ep_intensity}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.ep_vet_prognosis}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.ep_action_taken}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.ep_remarks}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    ) : (
                        <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                            <h2 className="pt-1 col-sm-12 text-center">
                                {!isLoading ? 'No Records found!' : ''}
                            </h2>
                        </div>
                    )}
                </div>
                {/* pet dropdown end */}
            </section>
        </Layout>
    );
};

export default Episodes;
