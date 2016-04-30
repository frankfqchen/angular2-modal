import {ModalContextBuilder, ModalContext} from '../../models/modal-context';
import {FluentAssignMethod} from './../../framework/fluent-assign';
import {extend, arrayUnion} from './../../framework/utils';

const DEFAULT_VALUES = {
    size: <BootstrapModalSize>'lg',
    dialogClass: 'modal-dialog'
};

const DEFAULT_SETTERS = [
    'dialogClass',
    'size'
];


export type BootstrapModalSize = 'sm' | 'lg';

export class BSModalContext extends ModalContext {
    /**
     * A Class for the modal dialog container.
     * Default: modal-dialog
     */
    dialogClass: string;

    /**
     * Size of the modal.
     * 'lg' or 'sm' only.
     * NOTE: No validation.
     * Default to 'lg'
     */
    size: BootstrapModalSize;

    normalize(): void {
        if (!this.size)
            this.size = DEFAULT_VALUES.size;

        if (!this.dialogClass) {
            this.dialogClass = DEFAULT_VALUES.dialogClass;
        }

        super.normalize();
    }
}


export class BSModalContextBuilder<T extends BSModalContext> extends ModalContextBuilder<T> {

    constructor(
        defaultValues: T = undefined,
        initialSetters: string[] = undefined,
        baseType: new () => T = undefined
    ) {
        super(
            extend<any>(DEFAULT_VALUES, defaultValues || {}),
            arrayUnion<string>(DEFAULT_SETTERS, initialSetters || []),
            baseType || <any>BSModalContext // https://github.com/Microsoft/TypeScript/issues/7234
        );
    }

    /**
     * Size of the modal.
     * 'lg' or 'sm' only.
     * NOTE: No validation.
     * Default to 'lg'
     */
    size: FluentAssignMethod<string, this>;

    /**
     * A Class for the modal dialog container.
     * Default: modal-dialog
     */
    dialogClass: FluentAssignMethod<BootstrapModalSize, this>;
}
