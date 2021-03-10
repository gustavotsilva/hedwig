import React from 'react';
import { IProps } from './homepage';

export const BannerUnsubscribed = ({state}: IProps) => (
    <div className={"container unsubscribed-banner" + (!state.isUnsubscribedLink ? " d-none" : "")}>
        <div className="row">
            <p>😢 You were <strong>unsubscribed!</strong> <span className="d-none d-md-inline-block">We hope to see you again soon</span></p>
        </div>
    </div>
);