import React from "react";
import { FormattedMessage } from "react-intl";

const traslate = (id, value) => <FormattedMessage id={id} values={...value} />

export default traslate