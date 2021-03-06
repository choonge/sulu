// @flow
import React from 'react';
import {computed} from 'mobx';
import Input from '../Input';
import resourceLocatorStyles from './resourceLocator.scss';

type Props = {|
    value: string,
    onChange: (value: string) => void,
    onBlur?: () => void,
    mode: 'full' | 'leaf',
|};

export default class ResourceLocator extends React.PureComponent<Props> {
    static defaultProps = {
        value: '/',
    };

    fixed: string = '';

    constructor(props: Props) {
        super(props);

        const {value, mode} = this.props;

        switch (mode) {
            case 'full':
                this.fixed = '/';
                break;
            case 'leaf':
                const parts = value.split('/');
                parts.pop();
                this.fixed = parts.join('/') + '/';
                break;
            default:
                throw new Error('Unknown mode given: "' + mode + '"');
        }
    }

    @computed get changeableValue() {
        return this.props.value.substring(this.fixed.length);
    }

    handleChange = (value: ?string) => {
        const {onChange} = this.props;

        onChange(value ? this.fixed + value : this.fixed);
    };

    render() {
        const {onBlur} = this.props;

        return (
            <div className={resourceLocatorStyles.resourceLocator}>
                <span className={resourceLocatorStyles.fixed}>{this.fixed}</span>
                <Input onChange={this.handleChange} onBlur={onBlur} value={this.changeableValue} />
            </div>
        );
    }
}
