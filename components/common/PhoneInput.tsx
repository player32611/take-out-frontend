"use client";

import { useState } from "react";
import { Input, Select, Space } from "antd";

interface PhoneValue {
	prefix?: string;
	phone?: string;
}

interface PhoneInputProps {
	id?: string;
	value?: PhoneValue;
	onChange?: (value: PhoneValue) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ id, value = {}, onChange }) => {
	const [prefix, setPrefix] = useState("86");
	const [phone, setPhone] = useState("");

	const triggerChange = (changedValue: PhoneValue) => {
		onChange?.({ ...value, ...changedValue });
	};

	const onPrefixChange = (newPrefix: string) => {
		if (!("prefix" in value)) {
			setPrefix(newPrefix);
		}
		triggerChange({ prefix: newPrefix });
	};

	const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newPhone = e.target.value;
		if (!("phone" in value)) {
			setPhone(newPhone);
		}
		triggerChange({ phone: newPhone });
	};

	return (
		<span id={id}>
			<Space.Compact block>
				<Select
					value={value.prefix || prefix}
					onChange={onPrefixChange}
					style={{ width: 70 }}
					options={[
						{ label: "+86", value: "86" },
						{ label: "+87", value: "87" },
					]}
				/>
				<Input
					value={value.phone || phone}
					onChange={onPhoneChange}
					style={{ width: "100%" }}
					placeholder="请输入手机号"
				/>
			</Space.Compact>
		</span>
	);
};

export default PhoneInput;
