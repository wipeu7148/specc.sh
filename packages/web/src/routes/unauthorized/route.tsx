import { useTranslation } from "react-i18next";
import ErrorPage from "@/components/error/ErrorPage";

export default function UnauthorizedRoute() {
  const { t } = useTranslation();
  return (
    <ErrorPage
      code="403"
      title={t("common.unauthorizedTitle")}
      description={t("common.unauthorizedDesc")}
      variant="danger"
      secondaryLabel={t("common.signIn")}
      secondaryTo="/login"
    />
  );
}
