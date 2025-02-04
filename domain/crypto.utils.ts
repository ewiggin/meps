
export class CryptoUtils {


    static async encryptData(data: unknown, defaultIv: Uint8Array) {
        const encoder = new TextEncoder();
        // Generar una clave AES-GCM de 256 bits
        const key = await crypto.subtle.generateKey(
            { name: "AES-GCM", length: 256 },
            true,
            ["encrypt", "decrypt"],
        );

        // Exportar la clave a formato RAW para reutilizarla
        const rawKey = await crypto.subtle.exportKey("raw", key);
        const keyBase64 = btoa(String.fromCharCode(...new Uint8Array(rawKey)));

        // Texto a cifrar
        const jsonData = JSON.stringify(data);

        // Vector de inicialización (IV) - debe ser aleatorio y único por cifrado
        const iv = defaultIv || crypto.getRandomValues(new Uint8Array(12));

        // Cifrar los datos
        const encryptedData = await crypto.subtle.encrypt(
            { name: "AES-GCM", iv },
            key,
            encoder.encode(jsonData),
        );

        // Convertir los datos cifrados a Base64 para almacenarlos en JSON
        const encryptedBase64 = btoa(
            String.fromCharCode(...new Uint8Array(encryptedData)),
        );
        const ivBase64 = btoa(String.fromCharCode(...iv));

        // Crear un JSON con datos cifrados
        const encryptedJson = {
            iv: ivBase64,
            data: encryptedBase64,
        };

        return {
            key: keyBase64,
            data: encryptedJson
        }
    }

    static async decrypt(receivedJson: { iv: string, data: string }, keyBase64: string) {

        const decoder = new TextDecoder();

        // Convertir las claves Base64 a bytes
        const keyBytes = new Uint8Array([...atob(keyBase64)].map(c => c.charCodeAt(0)));
        const iv2 = new Uint8Array([...atob(receivedJson.iv)].map(c => c.charCodeAt(0)));
        const encryptedBytes = new Uint8Array([...atob(receivedJson.data)].map(c => c.charCodeAt(0)));

        // Importar la clave AES-GCM
        const importedKey = await crypto.subtle.importKey(
            "raw",
            keyBytes,
            { name: "AES-GCM" },
            false,
            ["decrypt"]
        );

        // Descifrar los datos
        const decryptedData = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv2 },
            importedKey,
            encryptedBytes
        );

        return JSON.parse(decoder.decode(decryptedData));
    }
}