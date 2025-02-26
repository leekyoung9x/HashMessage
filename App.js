import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Buffer } from 'buffer';

// Hàm mã hóa Base64
const base64Encode = (text) => Buffer.from(text, 'utf-8').toString('base64');

// Hàm giải mã Base64
const base64Decode = (encodedText) => Buffer.from(encodedText, 'base64').toString('utf-8');

const App = () => {
    const [message, setMessage] = useState('');
    const [encryptedMessage, setEncryptedMessage] = useState('');
    const [language, setLanguage] = useState('vi'); // Mặc định là Tiếng Việt

    // Dữ liệu ngôn ngữ
    const translations = {
        vi: {
            title: '📌 Hướng dẫn sử dụng',
            instruction: 'Nhập tin nhắn và nhấn **Mã hóa** để chuyển sang Base64.\nNhập chuỗi Base64 và nhấn **Giải mã** để lấy lại văn bản gốc.\nKết quả sẽ được **tự động sao chép** vào Clipboard.',
            inputLabel: 'Nhập tin nhắn:',
            encodeButton: 'Mã hóa',
            encodedText: 'Chuỗi Base64:',
            decodeButton: 'Giải mã',
            copyAlert: 'Đã copy nội dung!',
            errorEmptyMessage: 'Vui lòng nhập tin nhắn.',
            errorEmptyEncoded: 'Vui lòng nhập chuỗi mã hóa.',
            langButton: '🇺🇸 English'
        },
        en: {
            title: '📌 Instructions',
            instruction: 'Enter a message and press **Encrypt** to convert to Base64.\nEnter a Base64 string and press **Decrypt** to retrieve the original text.\nThe result will be **automatically copied** to the clipboard.',
            inputLabel: 'Enter your message:',
            encodeButton: 'Encrypt',
            encodedText: 'Base64 String:',
            decodeButton: 'Decrypt',
            copyAlert: 'Copied to clipboard!',
            errorEmptyMessage: 'Please enter a message.',
            errorEmptyEncoded: 'Please enter an encoded string.',
            langButton: '🇻🇳 Tiếng Việt'
        }
    };

    // Hàm chuyển đổi ngôn ngữ
    const toggleLanguage = () => {
        setLanguage(language === 'vi' ? 'en' : 'vi');
    };

    // Mã hóa Base64
    const encryptMessage = () => {
        if (!message) {
            Alert.alert("Lỗi", translations[language].errorEmptyMessage);
            return;
        }

        try {
            const encrypted = base64Encode(message);
            setEncryptedMessage(encrypted);
            Clipboard.setStringAsync(encrypted);
            Alert.alert("Thông báo", translations[language].copyAlert);
        } catch (error) {
            Alert.alert("Lỗi mã hóa", error.message);
        }
    };

    // Giải mã Base64
    const decryptMessage = () => {
        if (!encryptedMessage) {
            Alert.alert("Lỗi", translations[language].errorEmptyEncoded);
            return;
        }

        try {
            const originalMessage = base64Decode(encryptedMessage);
            Clipboard.setStringAsync(originalMessage);
            Alert.alert("Tin nhắn gốc", originalMessage);
        } catch (error) {
            Alert.alert("Lỗi giải mã", error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 50, alignItems: 'center' }}>
            {/* Nút chuyển đổi ngôn ngữ */}
            <TouchableOpacity onPress={toggleLanguage} style={{ alignSelf: 'flex-end', marginBottom: 15 }}>
                <Text style={{ fontSize: 16, color: 'blue', fontWeight: 'bold' }}>{translations[language].langButton}</Text>
            </TouchableOpacity>

            {/* Hướng dẫn sử dụng */}
            <View style={{ marginBottom: 20, width: '100%' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>
                    {translations[language].title}
                </Text>
                <Text style={{ fontSize: 14, textAlign: 'center', color: 'gray' }}>
                    {translations[language].instruction}
                </Text>
            </View>

            {/* Ô nhập tin nhắn */}
            <View style={{ width: '100%', marginBottom: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>{translations[language].inputLabel}</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 10, borderRadius: 5, width: '100%' }}
                    value={message}
                    onChangeText={setMessage}
                    placeholder={translations[language].inputLabel}
                />
            </View>

            {/* Nút Mã hóa */}
            <View style={{ width: '100%', marginBottom: 20 }}>
                <Button title={translations[language].encodeButton} onPress={encryptMessage} />
            </View>

            {/* Kết quả mã hóa */}
            <View style={{ width: '100%', marginBottom: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>{translations[language].encodedText}</Text>
                <Text selectable style={{ borderWidth: 1, padding: 10, minHeight: 50, borderRadius: 5, backgroundColor: '#f5f5f5' }}>
                    {encryptedMessage}
                </Text>
            </View>

            {/* Nút Giải mã */}
            <View style={{ width: '100%', marginBottom: 20 }}>
                <Button title={translations[language].decodeButton} onPress={decryptMessage} />
            </View>
        </ScrollView>
    );
};

export default App;
