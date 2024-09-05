import { memo } from "react";

type Props = {
    height: string,
};

export const CssHeight: React.FC<Props> = memo((props) => {
    const { height } = props;

    const style = {
        height: height,
    }

    return (
        <div style={style}></div>
    );
});