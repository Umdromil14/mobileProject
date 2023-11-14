import { Input, Button, Text } from "@rneui/themed";
import { globalStyles } from "../styles/globalStyles";

function InputWithLabel({
    inputStyle = null,
    label = null,
    inputContainerStyle = null,
    placeholder = null,
    value = null,
    onChangeText = null,
    leftIcon = null,
    rightIcon = null,
    secureTextEntry = null,
    errorProps = null,
    onChange = null,
    errorMessage = null,
}) {
    return (
        <>
            <Text style={globalStyles.textForm}>{label}</Text>
            <Input
                inputStyle={inputStyle ? inputStyle : globalStyles.inputLabel}
                inputContainerStyle={
                    inputContainerStyle
                        ? inputContainerStyle
                        : globalStyles.inputContainer
                }
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                leftIcon={leftIcon}
                rightIcon={rightIcon}
                secureTextEntry={secureTextEntry}
                errorProps={errorProps}
                onChange={onChange}
                errorMessage={errorMessage}
            />
        </>
    );
}

function ValidateButton({
    title,
    buttonStyle = null,
    containerStyle = null,
    onPress,
}) {
    return (
        <Button
            title={title}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={
                buttonStyle
                    ? buttonStyle
                    : {
                          backgroundColor: "#59A52C",
                          borderWidth: 0,
                          borderRadius: 20,
                      }
            }
            containerStyle={
                containerStyle
                    ? containerStyle
                    : {
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                        paddingTop : 100
                      }
            }
            onPress={onPress}
        />
    );
}

export { InputWithLabel, ValidateButton };
