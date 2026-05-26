import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Button({ className, buttonText, iconFont, iconClass }: { className: string, buttonText: string, iconFont?: IconProp, iconClass?: string }) {
  return (
    <button className={className}>
      {iconFont && <FontAwesomeIcon icon={iconFont} className={iconClass} />}
      <p className="pr-4 pl-1 py-4">{buttonText}</p>
    </button>
  );
}