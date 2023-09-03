"use clent";

import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
    src: string;
    isOpen?: boolean;
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-80 h-80">
                <Image alt={src || 'image'} src={src} className="object-cover" fill />
            </div>
        </Modal>
    );
};

export default ImageModal;
