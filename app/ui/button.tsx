import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Button({ className, buttonText, iconFont, iconClass }: { className: string, buttonText: string, iconFont?: IconProp, iconClass?: string }) {
  return (
    <button className={className}>
      {iconFont && <FontAwesomeIcon icon={iconFont} className={iconClass} />}
      <p className="p-3">{buttonText}</p>
    </button>
  );
}