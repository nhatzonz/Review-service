import React from 'react';
import { useState, useEffect } from 'react';
import Header from './Header/Header';
import RatingSelect from '../RatingSelect/RatingSelect';

import classNames from 'classnames/bind';
import styles from './Layout.module.scss';

const cx = classNames.bind(styles);

const DATA = [
    {
        nameClient: 'Le  Thi Huong',
        nameService: 'Tắm trắng dưỡng da',
        nameStaff: 'Nguyễn Mạnh Cường, Nguyễn Mạnh Hà',
        spaceService: 'Không gian phục vụ',
        feedbackService: 'Góp ý chúng tôi',
        thanks: 'Cảm ơn bạn đã đánh giá dịch vụ !',
    },
];

let newReview2 = {};
let rateBack = {
    rateBack1: '',
    rateBack2: '',
};
function Layout() {
    const [rating, setRating] = useState(5);
    const [current, setCurrent] = useState(1);
    const [review, setReview] = useState([]);

    function handleNext() {
        if (current === 1) {
            newReview2 = { ...newReview2, [DATA[0].nameService]: rating };
            rateBack.rateBack1 = rating;
        } else if (current === 2) {
            newReview2 = { ...newReview2, [DATA[0].spaceService]: rating };
            rateBack.rateBack2 = rating;
        }
        setCurrent(current + 1);
        setRating(5);
    }

    function handleBack() {
        if (current === 2) {
            setRating(rateBack.rateBack1);
        } else if (current === 3) {
            setRating(rateBack.rateBack2);
        }
        setCurrent(current - 1);
    }

    function handleSubmit(value) {
        const newReview = {
            nameService: DATA[0].nameService,
            nameStaff: DATA[0].nameStaff,
            feedback: value,
            ...newReview2,
            nameClient: DATA[0].nameClient,
        };
        setReview([...review, newReview]);
        setCurrent(current + 1);
        setRating(5);
    }
    useEffect(() => {
        console.log(review);
    }, [review]);

    return (
        <div className={cx('wrapper')}>
            <Header contact=" 19001006" />
            <div className={cx('container')}>
                {current === 1 && (
                    <RatingSelect
                        data={DATA}
                        rating={rating}
                        setRating={setRating}
                        current={current}
                        onNext={handleNext}
                    />
                )}
                {current === 2 && (
                    <RatingSelect
                        rating={rating}
                        setRating={setRating}
                        current={current}
                        title={DATA[0].spaceService}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )}
                {current === 3 && (
                    <RatingSelect
                        rating={rating}
                        setRating={setRating}
                        current={current}
                        finish={true}
                        title={DATA[0].feedbackService}
                        onNext={handleSubmit}
                        onBack={handleBack}
                    />
                )}

                {current === 4 && (
                    <RatingSelect
                        rating={rating}
                        setRating={setRating}
                        title={DATA[0].thanks}
                        current={current}
                    />
                )}
            </div>
        </div>
    );
}

export default Layout;
