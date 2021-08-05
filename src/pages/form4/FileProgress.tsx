interface FileProgressProps {
  file?: File;
  progress?: number;
  deleteFile?: (file: File) => void;
  errorMessage?: string;
}

export default function FileProgress({
  file,
  deleteFile,
  progress,
  errorMessage,
}: FileProgressProps) {
  return (
    <>
      <div className="flex justify-between items-center my-1">
        <small className="w-76 truncate overflow-ellipsis">
          {errorMessage ? 'Error '+errorMessage : file.name}
        </small>
        {errorMessage ? null : <small>{progress + '%'}</small>}
        <small>
          <button
            type="button"
            onClick={() => deleteFile(file)}
            className="py-1 px-3 rounded bg-red-500 text-red-100 focus:ring outline-none"
          >
            Delete
          </button>
        </small>
      </div>

      <div
        style={{ width: progress + '%' }}
        className={`transition-all h-2 mb-3 rounded-sm ${
          errorMessage && 'bg-red-500 text-red-300'
        } ${progress == 100 && !errorMessage && 'bg-green-500'}  
        `}
      ></div>
    </>
  );
}
