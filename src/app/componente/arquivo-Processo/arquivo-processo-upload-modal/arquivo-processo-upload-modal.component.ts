import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

import { ArquivoProcesso } from 'src/app/models/arquivoProcesso';
import { ArquivoProcessoService } from '../arquivo-processo.service';

import { ProcessoCompartilhadoService } from '../../processo/processo-compartilhado.service';
import { ArquivoProcessoCompartilhadoService } from '../arquivo-processo-compartilhado.service';




interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-arquivo-processo-upload-modal',
  templateUrl: './arquivo-processo-upload-modal.component.html',
  styleUrls: ['./arquivo-processo-upload-modal.component.css'],
  providers: [MessageService]
})
export class ArquivoProcessoUploadModalComponent {
    @Input() displayModal = true; // Inicialização padrão
    @Output() close = new EventEmitter<boolean>();
    uploadedFiles: any[] = [];
    maxFileSizeNumber: number = 1000000;
    processoId: number = 0;


    constructor(private messageService: MessageService,
                private arquivoProcessoService: ArquivoProcessoService,
                private processoCompartilhadoService : ProcessoCompartilhadoService,
                private arquivoProcessoCompartilhadoService: ArquivoProcessoCompartilhadoService,
                public ref: DynamicDialogRef,


    ) {
      this.processoCompartilhadoService.processoId$.subscribe(id => {
        if (id !== null) {
          this.processoId = id;
        }
      });
    }

    testEvent() {
      console.log('onBeforeUpload foi acionado!');
  }


  onUpload(event: any) {
    for (let file of event.files) {
      const formData = new FormData();

      // 1. Adicione o arquivo ao formData
      formData.append('file', file, file.name);

      const arquivo: ArquivoProcesso = {
        id: 0,
        nomeArquivo: file.name,
        extensaoArquivo: file.name.split('.').pop() || '',
        descricao: file.description, // Usar a descrição do arquivo do input
        tamanhoArquivo: file.size,
        processoId: this.processoId,
        caminhoArquivo: ''
      };

      // 2. Adicione cada propriedade do objeto ArquivoProcesso como um campo separado no FormData
      formData.append('arquivoProcesso.NomeArquivo', arquivo.nomeArquivo);
      formData.append('arquivoProcesso.ExtensaoArquivo', arquivo.extensaoArquivo);
      formData.append('arquivoProcesso.Descricao', arquivo.descricao!);
      formData.append('arquivoProcesso.TamanhoArquivo', arquivo.tamanhoArquivo.toString());
      formData.append('arquivoProcesso.ProcessoId', arquivo.processoId.toString());
      formData.append('arquivoProcesso.CaminhoArquivo', arquivo.caminhoArquivo);

      this.uploadedFiles.push(file);

      this.arquivoProcessoService.salvar(formData).subscribe({
        next: () => {
          debugger;
          this.arquivoProcessoCompartilhadoService.enviarMensagem(true, 'Cadastro realizado com sucesso');
          this.fecharModal();
        },
      });
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }


  fecharModal() {
    this.displayModal = false;
    this.close.emit(true);
    this.ref.close();
  }
}
