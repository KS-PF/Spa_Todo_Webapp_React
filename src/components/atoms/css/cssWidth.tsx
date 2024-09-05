import { memo } from "react";

type Props = {
    width: string,
};

export const CssWidth: React.FC<Props> = memo((props) => {
    const { width } = props;

    const style = {
        width: width,
    }

    return (
        <div style={style}></div>
    );
});