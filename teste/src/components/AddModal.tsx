import React from 'react';
import { X, Check, AlertCircle } from 'lucide-react';

interface ExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle: string;
  ownerName: string;
  onConfirm: () => void;
  isSuccess?: boolean;
}

export default function ExchangeModal({ 
  isOpen, 
  onClose, 
  bookTitle, 
  ownerName, 
  onConfirm,
  isSuccess 
}: ExchangeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="vintage-card rounded-lg max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#2c1810] hover:text-[#8b4513]"
        >
          <X className="h-6 w-6" />
        </button>
        
        {isSuccess ? (
          <div className="text-center py-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#2c1810] mb-2">Solicitação Enviada!</h3>
            <p className="text-[#594a42] font-serif mb-6">
              O livro foi adcionado com sucesso.

            </p>
            <button
              onClick={onClose}
              className="vintage-button px-6 py-2 rounded-lg font-serif"
            >
              Ok
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#f8f3e7] border-2 border-[#2c1810] mb-4">
                <AlertCircle className="h-8 w-8 text-[#8b4513]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#2c1810]">Confirmar Solicitação</h3>
            </div>
            
            <p className="text-[#594a42] font-serif mb-6">
              Você está prestes a solicitar o livro <span className="font-semibold">"{bookTitle}"</span> de <span className="font-semibold">{ownerName}</span>. 
              Deseja prosseguir com esta solicitação?
            </p>
            
            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="flex-1 border-2 border-[#2c1810] text-[#2c1810] px-4 py-2 rounded-lg font-serif hover:bg-[#f8f3e7] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 vintage-button px-4 py-2 rounded-lg font-serif"
              >
                Confirmar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}