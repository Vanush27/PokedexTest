import React, {FC} from 'react';
import ReactPaginate from "react-paginate";

import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setCurrentOffsetPage, setCurrentPage} from "../../store/slices/pokemonSlice";

import styles from "./Pagination.module.scss";

const Pagination: FC = () => {

    const dispatch = useAppDispatch();
    const totalPageCount = useAppSelector((state) => state.allListPokemon.totalPageCount) as number;
    const currentPage = useAppSelector((state) => state.allListPokemon.currentPage);
    const limitPageCount = useAppSelector((state) => state.allListPokemon.limitPageCount);
    const pageCount = totalPageCount / limitPageCount;

    return (
        <div>
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={(e) => {
                    dispatch(setCurrentPage(e.selected + 1))
                    const selected = +((e.selected + 1) * limitPageCount)
                    const selected1 = selected - 10;
                    dispatch(setCurrentOffsetPage(selected1));
                }}
                pageCount={pageCount}
                forcePage={currentPage - 1}
            />
        </div>
    );
};

export default Pagination;