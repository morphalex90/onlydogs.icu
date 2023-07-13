import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useRouter } from 'next/router';
import { Breed } from '@/contex/BreedContext';

export default function Cats({ category = null }) {
    const [cats, setCats] = useState([]);

    const router = useRouter();

    const { breed, setBreed } = useContext(Breed); // saved from contex

    useEffect(() => {
        if (router.pathname !== '/category/[category_id]') {
            setBreed(null);
        }
        getCats();
    }, [category, breed]);

    const getCats = () => {
        axios
            .get('https://api.thedogapi.com/v1/images/search?page=0&limit=30' + (category != null ? '&category_ids=' + category : '') + (breed != null ? '&breed_ids=' + breed : ''))
            .then((res) => { setCats(res.data); })
            .catch((err) => { console.log(err); });
    }

    return (
        <>
            {cats.length > 0 &&
                <ResponsiveMasonry columnsCountBreakPoints={{ 768: 2, 992: 3, 1200: 4 }}>
                    <Masonry>
                        {(cats.map(cat => {
                            return (
                                <img key={cat.id} src={cat.url} alt={cat.id} title={cat.id} height={cat.height} width={cat.width} loading="lazy" />
                            )
                        }))}
                    </Masonry>
                </ResponsiveMasonry>
            }
            <button type="button" className="button" style={{ position: 'fixed', left: '50%', bottom: 50, zIndex: 999, transform: 'translateX(-50%)' }} onClick={() => getCats()}>Get more dogs</button>
        </>
    );
}
